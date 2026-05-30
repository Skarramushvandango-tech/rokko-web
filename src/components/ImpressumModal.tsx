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
            Markus Ilgner<br />
            Am Brunnen 3<br />
            47179 Duisburg
          </p>

          <h3>Kontakt</h3>
          <p>
            E-Mail: <a href="mailto:info@rokko-records.de" className="legal-link">info@rokko-records.de</a>
          </p>

          <h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>
            Markus Ilgner<br />
            Am Brunnen 3<br />
            47179 Duisburg
          </p>

          <h3>Haftungsausschluss</h3>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>

          <h3>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </div>
  );
}
