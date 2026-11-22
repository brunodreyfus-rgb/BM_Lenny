# V5 – Meet the Family visible

- After guest identification, a **Meet the Family** menu link and a prominent shortcut appear.
- The private gallery and both family trees now appear directly below the personalized welcome, before the event programme and RSVP.
- Removed the zodiac-style ♌ symbol from the hero and parasha sections; replaced it with the lion emoji 🦁.
- The gallery is still accessible only after guest identification. Photos are served via authenticated `/api/gallery/` endpoints.

## Deployment
Upload the **contents of `lenny-site`** to the existing GitHub repository and let Vercel redeploy. Check `private-gallery/` exists in the deployment and the Supabase environment variables are configured.

Note: This archive is a source-code update. It does not update the live website automatically.
