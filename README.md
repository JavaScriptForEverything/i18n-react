## Multi-language i18n

#### Directory Structure
```
.
├── src
│   ├── i18n
│   │   ├── en.json
│   │   └── es.json
│   │
│   ├── i18n.ts
│   │
│   ├── App.tsx
│   
```

#### Install packages
```
$ yarn add i18next react-i18next i18next-http-backend i18next-browser-languagedetector

```

#### /src/i18n/en.json
```
{
  "welcome": "Welcome, {{name}}!",
  "description": "This app supports multiple languages.",
  "date": "Today is {{date, datetime}}.",
  "user" : {
    "name": "riajul"
  }
}
```

#### /src/i18n/es.json
```
{
  "welcome": "Welcome, {{name}}!",
  "description": "This app supports multiple languages.",
  "date": "Today is {{date, datetime}}.",
  "user" : {
    "name": "riajul"
  }
}
```


#### src/i18n.ts
```
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./i18n/en.json";
import es from "./i18n/es.json";

export const supportedLanguages = ["en", "es" ]; 	// need to add manually too


i18n
  .use(LanguageDetector) // auto-detect user's language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: "en", 
    supportedLngs: supportedLanguages, 
    interpolation: {
      escapeValue: false, 
      format: (value, format) => {
        if (format === "datetime" && value instanceof Date) {
          return value.toLocaleDateString(i18n.language, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
        return value;
      },
    },
    detection: {
      order: ["localStorage", "navigator"], // check localStorage, then browser language
      caches: ["localStorage"], // store selected language
    },
  });

export default i18n;
```


#### src/App.tsx
```
import { useTranslation } from "react-i18next";
import i18n, { supportedLanguages } from './i18n'

export default function App() {
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">
        {
          t("welcome", { name: "Riajul" }) // => en.json .welcome + variable name
        }  
      </h1>
      <p className="mb-4">{t("description")}</p>
      <p className="mb-4">{t("user.name")}</p>
      <p className="mb-4">{t("date", { date: new Date() })}</p>
      <div className="flex gap-2">

        {/* <button
          onClick={() => changeLanguage("en")}  // => i18n.init().resources.en    
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("es")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Español
        </button> */}

				{supportedLanguages.map( lan => (
					<button key={lan}
						onClick={() => changeLanguage(lan)}
						className="px-4 py-2 bg-green-500 text-white rounded"
					>
						{lan}
					</button>
				))}

				<select
					className="mt-4 p-2 border rounded"
					value={i18n.language}
					onChange={(e) => changeLanguage(e.target.value)}
				>
					{supportedLanguages.map((lng) => (
						<option key={lng} value={lng}>
							{lng.toUpperCase()}
						</option>
					))}
				</select>


      </div>
    </div>
  );
}

```