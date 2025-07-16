import React, { useState } from "react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Loader2, FileText } from "lucide-react";

export default function RfpGenerator() {
  const [docId, setDocId] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [tabName, setTabName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://rfp-api-lu5o.onrender.com/multi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doc_id: docId, sheet_id: sheetId, tab_name: tabName }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      setMessage(result.message || "Completed");
    } catch (err) {
      setMessage(`Something went wrong: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Fever_company_logo.svg/512px-Fever_company_logo.svg.png"
        alt="Fever Logo"
        className="w-32 mb-6"
      />

      <Card className="max-w-xl w-full shadow-lg rounded-2xl">
        <CardContent className="flex flex-col gap-4 p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <FileText className="w-6 h-6" />
            Generate RFP Response
          </h1>

          <Input
            placeholder="Google Docs link"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
          />
          <Input
            placeholder="Google Sheet ID"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
          />
          <Input
            placeholder="Tab Name (e.g., TEMPLATE)"
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Generate"}
          </Button>

          {message && (
            <p className="text-center text-sm text-red-600 whitespace-pre-wrap">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
