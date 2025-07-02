"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReduxProvider({ children }) {
    return <Provider store={store}>
        <TopBar />
        <Header />
        {children}
        <Footer />
    </Provider>;
}
