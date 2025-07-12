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
