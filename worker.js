export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.psm.observer") {
      url.hostname = "psm.observer";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
