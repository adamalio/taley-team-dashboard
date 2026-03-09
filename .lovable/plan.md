

## Plan: Supabase Auth mit Google Login

### Überblick
Supabase als Backend verbinden mit Google OAuth Login. Bestehende Login-Seite wird zu echtem Auth umgebaut, geschützte Routen werden hinzugefügt.

### Supabase-Konfiguration (manuell im Supabase Dashboard)
1. **Google Provider aktivieren**: Supabase Dashboard → Authentication → Providers → Google → Enable
   - Google Client ID und Secret aus deinem bestehenden Google Cloud Projekt eintragen
   - Redirect URL von Supabase kopieren und in Google Cloud Console unter "Authorized redirect URIs" hinzufügen: `https://szflygrwneflijjyvcfo.supabase.co/auth/v1/callback`

### Code-Änderungen

**1. Supabase Client erstellen** (`src/lib/supabase.ts`)
- Initialisiere Supabase Client mit URL + Anon Key
- URL: `https://szflygrwneflijjyvcfo.supabase.co`
- Key: `sb_publishable_gmfq5ldKsYcHaHOA8zweiA_TYTVysW4`

**2. Auth Context** (`src/contexts/AuthContext.tsx`)
- React Context mit `user`, `session`, `loading`, `signInWithGoogle()`, `signOut()`
- `onAuthStateChange` Listener + `getSession()` beim Mount
- Provider wraps App

**3. Login-Seite umbauen** (`src/pages/Login.tsx`)
- "Mit Google anmelden" Button hinzufügen → `supabase.auth.signInWithOAuth({ provider: 'google' })`
- E-Mail/Passwort Login optional beibehalten mit `signInWithPassword`
- Redirect nach `/` bei erfolgreichem Login

**4. Auth Callback Route** (`src/pages/AuthCallback.tsx`)
- Neue Route `/auth/callback` für OAuth Redirect-Handling

**5. Protected Route** (`src/components/ProtectedRoute.tsx`)
- Prüft ob User eingeloggt, sonst Redirect zu `/login`

**6. App.tsx aktualisieren**
- `AuthProvider` um alles wrappen
- Dashboard-Routen mit `ProtectedRoute` schützen
- `/auth/callback` Route hinzufügen

**7. TopBar Avatar aktualisieren**
- User-Initialen aus Auth-Daten
- Logout-Button im Dropdown

### Voraussetzung
Du musst im Supabase Dashboard den Google Auth Provider aktivieren und die Google OAuth Credentials (Client ID + Secret) eintragen, die du bereits für den Drive Picker nutzt.

