import { useState } from "react"
import { useUser } from "../../../hooks/useUser"
import { FAQCategories } from "./FAQSections/FAQCategories"
import { FAQNavBar } from "./FAQSections/FAQNavBar"
import { FAQSignificadoIcons } from "./FAQSections/FAQSignificadoIcons"
import { FAQProblems } from "./FAQSections/FAQProblems"

export function FAQ() {
    const { user } = useUser()
    const [activeTab, setActiveTab] = useState("categories")

  return (
    <> 
        { user.id &&      
            <div className="flex flex-col items-start justify-start min-h-screen gap-10 p-4 pt-28 sm:p-10 lg:pt-24 bg-slate-950">
                <FAQNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === "categories" && <FAQCategories/>}
                {activeTab === "icons" && <FAQSignificadoIcons/>}
                {activeTab === "problems" && <FAQProblems/>}
            </div>
        }
    </>
  )
}
