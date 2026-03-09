

## Plan: Profiles-Tabelle für Benutzerdaten

### Überblick
Eine `profiles`-Tabelle in Supabase erstellen, die mit `auth.users` verknüpft ist und zusätzliche Benutzerdaten (Name, Avatar, Bio) speichert. Automatische Profilerstellung bei Registrierung via Trigger.

---

### 1. Datenbank-Migration (Supabase SQL Editor)

Du musst folgendes SQL im Supabase Dashboard → SQL Editor ausführen:

```sql
-- Profiles Tabelle erstellen
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security aktivieren
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies: User kann nur eigenes Profil lesen/bearbeiten
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Trigger: Automatisch Profil bei Signup erstellen
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

### 2. Code-Änderungen

**TypeScript Types** (`src/types/profile.ts`)
- Interface für Profile-Daten definieren

**Profile Hook** (`src/hooks/useProfile.ts`)
- `useProfile()` Hook zum Laden/Aktualisieren des Profils
- Verwendet React Query für Caching

**AuthContext erweitern**
- `profile` State hinzufügen
- Profile bei Auth-Änderung laden

**Profile-Seite** (`src/pages/Profile.tsx`)
- Formular zum Bearbeiten von Name, Avatar-URL, Bio
- Speichern-Funktion mit Feedback

**TopBar aktualisieren**
- Avatar und Name aus Profile-Daten laden statt nur user_metadata

---

### Ablauf
1. Du führst das SQL im Supabase Dashboard aus
2. Ich implementiere die Code-Änderungen
3. Bei Google-Login wird automatisch ein Profil mit Name/Avatar erstellt
4. User können ihr Profil auf der Profil-Seite bearbeiten

