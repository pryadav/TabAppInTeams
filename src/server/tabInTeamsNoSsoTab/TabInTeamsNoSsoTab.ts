import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/tabInTeamsNoSsoTab/index.html")
@PreventIframe("/tabInTeamsNoSsoTab/config.html")
@PreventIframe("/tabInTeamsNoSsoTab/remove.html")
export class TabInTeamsNoSsoTab {
}
