import { NextPage, NextPageContext } from "next";
import CoffeShopProvider from "./provider";
import { FC } from "react";

export function CoffeeShopPageProvider(Page: FC) {
    const page: FC = (props) => {
        return (
            //@ts-ignore
            <CoffeShopProvider profile={props.profile}>
                <Page {...props} />
            </CoffeShopProvider>
        )
    }
    return page;
}