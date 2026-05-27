interface DSEModalProps {
  onClose: () => void;
}

export default function DSEModal({ onClose }: DSEModalProps) {
  return (
    <div
      className="legal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="legal-popup">
        <button className="legal-close" onClick={onClose} aria-label="Schließen">✕</button>
        <h2 className="legal-title">Datenschutzerklärung</h2>

        <div className="legal-body">
          <h3>1. Verantwortlicher</h3>
          <p>ROKKO! Records<br />
          Kontakt: [E-Mail-Adresse wird ergänzt]</p>

          <h3>2. Allgemeines</h3>
          <p>Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Diese Website dient ausschließlich der Information über das Label ROKKO! Records und leitet auf externe Plattformen weiter. Es werden keine personenbezogenen Daten durch uns erhoben, gespeichert oder verarbeitet.</p>

          <h3>3. Erhebung von Daten</h3>
          <p>Diese Website erhebt keine personenbezogenen Daten. Es werden keine Cookies gesetzt, kein Tracking durchgeführt und keine Analyse-Tools eingesetzt.</p>

          <h3>4. Externe Links</h3>
          <p>Diese Website enthält Links zu externen Diensten wie Spotify, Apple Music, Amazon Music, Instagram, Facebook, TikTok und SoundCloud. Für die Datenschutzpraktiken dieser Dienste sind deren jeweilige Betreiber verantwortlich. Bitte lesen Sie die Datenschutzrichtlinien der entsprechenden Dienste.</p>

          <h3>5. Kontaktformular</h3>
          <p>Sobald ein Kontaktformular auf dieser Website eingebunden wird, werden die darin eingegebenen Daten (Name, E-Mail-Adresse, Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben. Die Daten werden nach Abschluss der Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>

          <h3>6. Hosting</h3>
          <p>Diese Website wird über Replit gehostet. Replit kann beim Aufruf der Website technische Zugriffsdaten (z. B. IP-Adresse, Zeitstempel) verarbeiten. Weitere Informationen finden Sie in der Datenschutzerklärung von Replit unter replit.com/privacy.</p>

          <h3>7. Ihre Rechte</h3>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Da wir keine personenbezogenen Daten erheben, entsteht in der Regel kein Handlungsbedarf. Bei Fragen wenden Sie sich bitte an uns per E-Mail.</p>

          <h3>8. Änderungen</h3>
          <p>Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren, insbesondere wenn ein Kontaktformular eingebunden wird.</p>

          <p className="legal-date">Stand: Mai 2025</p>
        </div>
      </div>
    </div>
  );
}
