export async function redirectToAuthCodeFlow(clientId: string): Promise<string> {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    if (typeof window !== "undefined"){
        localStorage.setItem("verifier", verifier);
    }
    
    clientId === 'undefined' ? clientId = process.env.SPOTIFY_CLIENT_ID : clientId;

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/login");
    params.append("scope", "user-read-private user-read-email user-read-currently-playing"); /* scopes HEAVILY subject to change */
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    return `https://accounts.spotify.com/authorize?${params.toString()}`;

}

export async function getAccessToken(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/login");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digestBuffer = await crypto.subtle.digest('SHA-256', data);
  const digestArray = Array.from(new Uint8Array(digestBuffer));
  const base64Url = btoa(String.fromCharCode(...digestArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return base64Url;
}

export default generateCodeChallenge;
