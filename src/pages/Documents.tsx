import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const DRIVE_FOLDER_ID = "1LH2hbUAfDyZLMoIY9OSZHVj7Btif6TJU";
const API_KEY = "AIzaSyCwWenwL_CipVC-gpug969dVuJTbirUdn0";
const CLIENT_ID = "466937052748-fc7mjm4947pcnr9acvq7o60sq87k02km.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

let pickerApiLoaded = false;
let gisLoaded = false;
let tokenClient: google.accounts.oauth2.TokenClient | null = null;
let accessToken: string | null = null;

const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });

const Documents = () => {
  const [loading, setLoading] = useState(false);

  const ensureScripts = useCallback(async () => {
    if (!pickerApiLoaded) {
      await loadScript("https://apis.google.com/js/api.js");
      await new Promise<void>((res) => gapi.load("picker", () => res()));
      pickerApiLoaded = true;
    }
    if (!gisLoaded) {
      await loadScript("https://accounts.google.com/gsi/client");
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: () => {},
      });
      gisLoaded = true;
    }
  }, []);

  const getToken = useCallback(
    () =>
      new Promise<string>((resolve, reject) => {
        if (accessToken) {
          resolve(accessToken);
          return;
        }
        if (!tokenClient) {
          reject(new Error("Token client not initialized"));
          return;
        }
        tokenClient.callback = (resp) => {
          if (resp.error) {
            accessToken = null;
            reject(new Error(resp.error));
            return;
          }
          accessToken = resp.access_token;
          resolve(resp.access_token);
        };
        tokenClient.requestAccessToken({ prompt: accessToken ? "" : "consent" });
      }),
    []
  );

  const openPicker = useCallback(
    async (token: string, view: "upload" | "browse") => {
      const uploadView = new google.picker.DocsUploadView();
      uploadView.setParent(DRIVE_FOLDER_ID);

      const browseView = new google.picker.DocsView(google.picker.ViewId.DOCS);
      browseView.setParent(DRIVE_FOLDER_ID);
      browseView.setIncludeFolders(true);

      const builder = new google.picker.PickerBuilder()
        .setOAuthToken(token)
        .setDeveloperKey(API_KEY)
        .setAppId(CLIENT_ID.split("-")[0])
        .setCallback((data: google.picker.ResponseObject) => {
          if (data.action === google.picker.Action.PICKED) {
            toast({
              title: "Erfolgreich!",
              description: `${data.docs.length} Datei(en) ausgewählt.`,
            });
          }
        });

      if (view === "upload") {
        builder.addView(uploadView);
        builder.setTitle("Dateien in Google Drive hochladen");
      } else {
        builder.addView(browseView);
        builder.addView(uploadView);
        builder.setTitle("Google Drive Dokumente");
      }

      builder.build().setVisible(true);
    },
    []
  );

  const handleUpload = useCallback(async () => {
    setLoading(true);
    try {
      await ensureScripts();
      const token = await getToken();
      await openPicker(token, "upload");
    } catch (e) {
      console.error(e);
      toast({ title: "Fehler", description: "Google Picker konnte nicht geöffnet werden.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [ensureScripts, getToken, openPicker]);

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dokumente</h1>
          <p className="text-muted-foreground">Verwalte und teile Dokumente mit deinem Team.</p>
        </div>
        <Button onClick={handleUpload} disabled={loading}>
          <Upload className="mr-2 h-4 w-4" />
          {loading ? "Lädt..." : "Hochladen"}
        </Button>
      </div>
      <iframe
        src={`https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#list`}
        className="w-full h-full rounded-lg border bg-card"
        title="Google Drive Dokumente"
        allowFullScreen
      />
    </div>
  );
};

export default Documents;
