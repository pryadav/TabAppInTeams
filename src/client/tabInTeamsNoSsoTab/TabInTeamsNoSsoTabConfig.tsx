import * as React from "react";
import { Provider, Flex, Header, Input } from "@fluentui/react-northstar";
import { useState, useEffect, useRef } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { TabList } from "./TabList";

/**
 * Implementation of TabInTeamsNoSSO configuration page
 */
export const TabInTeamsNoSsoTabConfig = () => {

    const [{ inTeams, theme, context }] = useTeams({});
    const [text, setText] = useState<string>();
    const entityId = useRef("");
    var chatId: string = "";
    const tabUtil = new TabList();

    const onSaveHandler = (saveEvent: microsoftTeams.settings.SaveEvent) => {
        alert(chatId);
        if(!tabUtil.isTabPresent(chatId)) {
        const host = "https://" + window.location.host;
        microsoftTeams.settings.setSettings({
            contentUrl: host + "/tabInTeamsNoSsoTab/?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}",
            websiteUrl: host + "/tabInTeamsNoSsoTab/?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}",
            suggestedDisplayName: "TabInTeamsNoSSO",
            removeUrl: host + "/tabInTeamsNoSsoTab/remove.html?theme={theme}",
            entityId: chatId
        });
        tabUtil.addTab(chatId);
        console.log("here comes the populated list!!!");
        saveEvent.notifySuccess();
    } else {
        saveEvent.notifyFailure("app already loaded!");
    }
    };

    useEffect(() => {
        if (context) {
            setText(context.entityId);
            entityId.current = context.entityId;
            chatId = context.chatId != undefined ? context.chatId: "TabApp";
            console.log(context.chatId);
            microsoftTeams.settings.registerOnSaveHandler(onSaveHandler);
            microsoftTeams.settings.setValidityState(true);
            microsoftTeams.appInitialization.notifySuccess();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    return (
        <Provider theme={theme}>
            <Flex fill={true}>
                <Flex.Item>
                    <div>
                        <Header content="Configure your tab" />
                        {/* <Input
                            placeholder="configure a value here"
                            fluid
                            clearable
                            value={text}
                            onChange={(e, data) => {
                                if (data) {
                                    setText(data.value);
                                    entityId.current = data.value;
                                }
                            }}
                            required /> */}
                    </div>
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
