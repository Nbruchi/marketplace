import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../language-provider";
import { languageOptions } from "@/constants";
import { ChevronDown } from "lucide-react";

const LanguageSelector = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex text-white hover:text-white hover:bg-transparent"
                >
                    <span className="text-sm flex items-center gap-1">
                        <Image
                            src={languageOptions[language].flag}
                            alt={languageOptions[language].label}
                            width={20}
                            height={14}
                        />
                        {languageOptions[language].label}
                    </span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.entries(languageOptions).map(([lang, option]) => (
                    <DropdownMenuItem
                        key={lang}
                        onClick={() => setLanguage(lang as "en" | "fr" | "es")}
                    >
                        <Image
                            src={option.flag}
                            alt={option.label}
                            width={20}
                            height={14}
                        />
                        {option.label} {lang === language && "✓"}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
