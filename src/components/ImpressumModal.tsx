interface ImpressumModalProps {
  onClose: () => void;
}

export default function ImpressumModal({ onClose }: ImpressumModalProps) {
  return (
    <div
      className="legal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="legal-popup">
        <button className="legal-close" onClick={onClose} aria-label="Schließen">✕</button>
        <h2 className="legal-title">Impressum</h2>

        <div className="legal-body">
          <h3>Angaben gemäß § 5 TMG</h3>
          <p>
            ROKKO! Records<br />
            [Straße und Hausnummer]<br />
            [PLZ] [Stadt]<br />
            Deutschland
          </p>

          <h3>Kontakt</h3>
          <p>
            E-Mail: [E-Mail-Adresse]
          </p>

          <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>
            [Name des Verantwortlichen]<br />
            [Adresse wie oben]
          </p>

          <h3>Haftungsausschluss</h3>
          <h4>Haftung für Inhalte</h4>
          <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>

          <h4>Haftung für Links</h4>
          <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

          <h4>Urheberrecht</h4>
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>

          <p className="legal-date">Stand: Mai 2025</p>
        </div>
      </div>
    </div>
  );
}
