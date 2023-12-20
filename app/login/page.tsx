import { redirectToAuthCodeFlow, getAccessToken } from "./auth";

const clientId = process.env.SPOTIFY_CLIENT_ID
const params = new URLSearchParams();
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    populateUI(profile);
}

async function fetchProfile(code: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });

    return await result.json()
}

function populateUI(profile: UserProfile) {
    alert(`Hey there ${profile.display_name}!`)
}

const Page = () => {
    return (
        <div> Hello </div>
    )
}

export default Page;