import http from "../http-common";

class TutorialDataService {
  findByTitle(title) {
    return http.get(`/me?title=${title}`);
  }
}

export default new TutorialDataService();
