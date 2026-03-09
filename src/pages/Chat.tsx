import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, Phone, Video, MoreVertical, Smile, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

const contacts = [
  { id: 1, name: "Anna M.", initials: "AM", lastMsg: "Klingt gut, mache ich!", time: "10:32", unread: 2, online: true },
  { id: 2, name: "Max K.", initials: "MK", lastMsg: "PR ist fertig zum Review", time: "09:15", unread: 0, online: true },
  { id: 3, name: "Team Allgemein", initials: "TA", lastMsg: "Sarah: Meeting morgen um 10?", time: "Gestern", unread: 5, online: false },
  { id: 4, name: "Sarah L.", initials: "SL", lastMsg: "Dokument angehängt 📎", time: "Gestern", unread: 0, online: false },
  { id: 5, name: "Tom B.", initials: "TB", lastMsg: "Danke für die Hilfe!", time: "Mo", unread: 0, online: true },
  { id: 6, name: "Lisa W.", initials: "LW", lastMsg: "Feedback ist eingepflegt", time: "Mo", unread: 0, online: false },
];

const messages = [
  { id: 1, sender: "Anna M.", initials: "AM", text: "Hey! Hast du die neuen Design-Entwürfe gesehen?", time: "10:15", mine: false },
  { id: 2, sender: "Du", initials: "DU", text: "Ja, sehen super aus! Besonders die Hero Section.", time: "10:18", mine: true },
  { id: 3, sender: "Anna M.", initials: "AM", text: "Danke! Ich habe die Farben noch mal angepasst. Soll ich das gleich ins Projekt übernehmen?", time: "10:22", mine: false },
  { id: 4, sender: "Du", initials: "DU", text: "Auf jeden Fall. Kannst du vorher noch die mobilen Breakpoints checken?", time: "10:25", mine: true },
  { id: 5, sender: "Anna M.", initials: "AM", text: "Klar, schaue ich mir an. Gibt's dafür eine bestimmte Deadline?", time: "10:28", mine: false },
  { id: 6, sender: "Du", initials: "DU", text: "Wäre super, wenn es bis Freitag fertig wäre. Kein Stress aber.", time: "10:30", mine: true },
  { id: 7, sender: "Anna M.", initials: "AM", text: "Klingt gut, mache ich! 👍", time: "10:32", mine: false },
];

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState("");
  const [searchContacts, setSearchContacts] = useState("");

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchContacts.toLowerCase())
  );

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
        <p className="text-muted-foreground">Kommuniziere in Echtzeit mit deinem Team.</p>
      </div>

      <Card className="flex h-[calc(100%-4rem)] overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-72 border-r border-border flex flex-col shrink-0 hidden md:flex">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Kontakte suchen..."
                value={searchContacts}
                onChange={(e) => setSearchContacts(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors text-left",
                  selectedContact.id === contact.id && "bg-accent"
                )}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">{contact.initials}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium truncate">{contact.name}</p>
                    <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.lastMsg}</p>
                </div>
                {contact.unread > 0 && (
                  <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px]">
                    {contact.unread}
                  </Badge>
                )}
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">{selectedContact.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{selectedContact.name}</p>
                <p className="text-xs text-primary">{selectedContact.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-2", msg.mine && "flex-row-reverse")}>
                  {!msg.mine && (
                    <Avatar className="h-7 w-7 mt-1">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{msg.initials}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2",
                    msg.mine ? "bg-primary text-primary-foreground rounded-br-md" : "bg-accent rounded-bl-md"
                  )}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={cn(
                      "text-[10px] mt-1",
                      msg.mine ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Nachricht schreiben..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && setMessage("")}
              />
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-9 w-9 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
