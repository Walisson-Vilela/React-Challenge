import React from 'react';

interface FooterProps {
    hasPendingSelected: boolean;
    concludeSelected: () => void;
}

const Footer: React.FC<FooterProps> = ({ hasPendingSelected, concludeSelected }) => {
    return (
        <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', textAlign: 'right' }}>
            <button 
                onClick={concludeSelected} 
                disabled={!hasPendingSelected}
            >
                Conclude Selected Visits
            </button>
        </footer>
    );
};

export default Footer;