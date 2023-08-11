import React, { FC, useState, useEffect } from "react";

type TabsProps = {
    selectedTab: number,
    tabs: {
        label: string;
        index: number;
        Component: FC<{ index: number }>;
    }[];
};

const Tabs: FC<TabsProps> = ({ tabs }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(1);

    const handleClickTab = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <div className="tabs-component">
            <div role="tablist" aria-orientation="horizontal">
                {tabs.map((tab) => (
                    <button
                        className={activeTabIndex === tab.index ? "active" : ""}
                        onClick={() => handleClickTab(tab.index)}
                        key={tab.index}
                        type="button"
                        role="tab"
                        aria-selected={activeTabIndex === tab.index}
                        aria-controls={`tabpanel-${tab.index}`}
                        tabIndex={activeTabIndex === tab.index ? 0 : -1}
                        id={`btn-${tab.index}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>
                {tabs.map((tab) => (
                    <div
                        key={tab.index}
                        style={{
                            display: activeTabIndex === tab.index ? "block" : "none",
                            height: activeTabIndex === tab.index ? "auto" : 0,
                            opacity: activeTabIndex === tab.index ? 1 : 0,
                            overflow: "hidden",
                            transition: "height 0.3s ease, opacity 0.3s ease"
                        }}
                        role="tabpanel"
                        aria-labelledby={`btn-${tab.index}`}
                        id={`tabpanel-${tab.index}`}
                    >
                        <tab.Component index={tab.index} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
