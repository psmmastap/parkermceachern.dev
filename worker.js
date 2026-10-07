export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.parkermceachern.dev") {
      url.hostname = "parkermceachern.dev";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
