const DRIVE_FOLDER_ID = "1LH2hbUAfDyZLMoIY9OSZHVj7Btif6TJU";

const Documents = () => (
  <div className="space-y-4 h-[calc(100vh-8rem)]">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dokumente</h1>
      <p className="text-muted-foreground">Verwalte und teile Dokumente mit deinem Team.</p>
    </div>
    <iframe
      src={`https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#list`}
      className="w-full h-full rounded-lg border bg-card"
      title="Google Drive Dokumente"
      allowFullScreen
    />
  </div>
);

export default Documents;
