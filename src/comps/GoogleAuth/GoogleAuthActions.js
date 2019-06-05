import URLSearchParams from "url-search-params";
import React from "react";
import { Redirect } from 'react-router-dom'

export const url = "https://fakernews-waslab.herokuapp.com";

/*These are the django client ID and SECRET
  from the OauthToolkit Application registered in your django admin
*/
export const django_client_id = "iFw4IKEsr5jiywMvQa9Z3NrlRa9Z7as5IUjUtp4b";
export const django_client_secret =
  "lcmREjjVnPqMJGhCJuCIAawsG1qXggZWlXsIU810Ut9dfIBbyPAvrO4MqcPyKC94R2yByuBeXzr6pWjIXO4xhkvzMFnBwKvkSW9Ow2ax4kO1PREOctJVfAumxIuLXP71";

const isAuthenticating = () => ({
  type: "GOOG_IS_AUTHENTICATING"
});

function obtainAuthToken(goog_token){
  if (!goog_token) return false;
  fetch(`${url}/api/register`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${goog_token}`
    }
  }).then((res) => {
        return res.json()
      })
      .then((responseJson) => {
          localStorage.setItem("authToken",responseJson.token);
          localStorage.setItem("userID",responseJson.id)
      })
  return true
}

function convertGoogTokenSuccess(json) {
  return obtainAuthToken(json.access_token);
}

const convertGoogTokenFailure = err => ({
  type: "CONVERT_GOOG_TOKEN_FAILURE",
  err
});

function logout(){
  localStorage.clear();
  return <Redirect to='/'/>
}

// the API endpoint expects form-urlencoded-data thus search-params
function convertGoogleToken(access_token) {
  const searchParams = new URLSearchParams();
  searchParams.set("grant_type", "convert_token");
  searchParams.set("client_id", django_client_id);
  searchParams.set("client_secret", django_client_secret);
  searchParams.set("backend", "google-oauth2");
  searchParams.set("token", access_token);
  try {
    fetch(`${url}/auth/convert-token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: searchParams
    }).then((res) => {
        return res.json()
      })
      .then((responseJson) => {
          console.log(convertGoogTokenSuccess(responseJson));
      })
  } catch (err) {
    return err
  }
}

export { logout, convertGoogleToken, convertGoogTokenSuccess, obtainAuthToken };