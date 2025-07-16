import { useState } from "react";
import Input from "../components/ui/input"; // ✅ fixed path
import Button from "../components/ui/button"; // ✅ fixed path
import { Card, CardContent } from "../components/ui/card"; // ✅ fixed path
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
      const result = await response.json();
      setMessage(result.message || "Completed");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="max-w-xl w-full p-6 shadow-xl">
        <CardContent className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" /> Generate RFP Response
          </h1>
          <Input
            placeholder="Google Docs Link"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
          />
          <Input
            placeholder="Google Sheet ID"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
          />
          <Input
            placeholder="Tab Name (e.g., Template)"
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Generate"}
          </Button>
          {message && <p className="text-center text-muted-foreground text-sm">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
