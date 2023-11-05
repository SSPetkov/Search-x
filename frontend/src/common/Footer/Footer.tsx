import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-info">
                    &copy; {new Date().getFullYear()} Svetlio Petkov - Search X
                </div>
            </div>
        </footer>
    );
};

export default Footer;
