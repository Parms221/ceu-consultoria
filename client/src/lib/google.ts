import config from "@/config";

export function getGoogleAuthUrl() {
    const url = new URL(config.google_auth_uri);
    url.searchParams.append("client_id", config.google_client_id);
    url.searchParams.append("redirect_uri", config.google_redirect_uri);
    url.searchParams.append("scope", config.google_scopes.split(",").join(" "));
    url.searchParams.append("response_type", "code");
    url.searchParams.append("access_type", "offline");
    url.searchParams.append("prompt", "consent");
    return url;
}