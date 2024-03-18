import BaseLayout from "../layouts/BaseLayout";
import { AuthProvider } from "../AuthContext";
function About() {
  return (
    <AuthProvider>
      <BaseLayout>
        <div>
          Built with ❤️ by Oliver Ye and Dev Patel. Visit{" "}
          <a
            href="https://www.readysethealth.io/"
            className="underline"
            target="_blank"
          >
            https://www.readysethealth.io/
          </a>{" "}
          for more information on Health Engine.
        </div>
      </BaseLayout>
    </AuthProvider>
  );
}

export default About;
