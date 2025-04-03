import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-links">
                <div className="footer-kofi">
                    <a
                        href="https://ko-fi.com/isommersieisalvati"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ko-fi - Buy me a
                        coffee ☕ to
                        support this
                        project!”
                    </a>
                </div>
                <div className="footer-personal">
                    <div className="footer-mastodon">
                        <a
                            href="https://o3o.ca/@Isommersieisalvati"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Mastodon
                        </a>
                    </div>
                    <div className="footer-blog">
                        <a
                            href="https://isommersieisalvati.github.io/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Blog
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
