import { AccountSettingsItem } from "./items/AccountSettingsItem";
import { DownloadHistoryItem } from "./items/DownloadHistoryItem";
import { MyModpacksItem } from "./items/MyModpacksItem";
import { MyModsItem } from "./items/MyModsItem";
import { MyProfileItem } from "./items/MyProfileItem";
import { SignOutItem } from "./items/SignOutItem";

export const navbarAuthedItems = [
    {
        id: 'my-profile',
        component: MyProfileItem,
    },
    {
        id: 'my-mods',
        component: MyModsItem,
    },
    {
        id: 'my-modpacks',
        component: MyModpacksItem,
    },
    {
        id: 'download-history',
        component: DownloadHistoryItem,
    },
    {
        id: 'account-settings',
        component: AccountSettingsItem,
    },
    {
        id: 'sign-out',
        component: SignOutItem,
    },
]
