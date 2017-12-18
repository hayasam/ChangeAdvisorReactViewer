class Constants {

    static SERVER_URL = "http://localhost:8080";
    //static SERVER_URL = "http://192.168.0.39:8080";

    static FEATURE_REQUEST = "FEATURE REQUEST";
    static INFO_SEEKING = "INFORMATION SEEKING";
    static INFO_GIVING = "INFORMATION GIVING";
    static PROBLEM_DISCOVERY = "PROBLEM DISCOVERY";
    static OTHER = "OTHER";

    static CATEGORIES = [
        Constants.FEATURE_REQUEST,
        Constants.INFO_SEEKING,
        Constants.INFO_GIVING,
        Constants.PROBLEM_DISCOVERY,
        Constants.OTHER,
    ]
}

export default Constants;