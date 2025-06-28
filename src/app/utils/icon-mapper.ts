import{
    faSun,
    faCloudSun,
    faCloudRain,
    faCloudShowersHeavy,
    faSmog,
    faSnowflake,
    faBolt,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export function mapWeatherCodeToIcon(code: number): IconDefinition{
    if(code === 0) return faSun;
    if(code >= 1 && code <= 3) return faCloudSun;
    if(code === 45 || code === 48) return faSmog;
    if((code >= 51 && code <= 57) || (code >= 80 && code <= 82)) return faCloudRain;
    if(code >= 61 && code <= 67) return faCloudShowersHeavy;
    if(code >= 71 && code <= 77) return faSnowflake;
    if(code >= 95 && code <= 99) return faBolt;

    return faSun;
}
