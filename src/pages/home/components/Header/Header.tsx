import React from 'react';

interface HeaderProps {
    pendingCount: number;
    openModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ pendingCount, openModal }) => {
    let counterColor = 'blue';
    if (pendingCount <= 3) counterColor = 'green';
    else if (pendingCount >= 10) counterColor = 'red';

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <h1>Visit Management</h1>
            <div>
                <span style={{ color: counterColor }}>Pending Visits: {pendingCount}</span>
                <button onClick={openModal} style={{ marginLeft: '1rem' }}>Create Visit</button>
            </div>
        </header>
    );
};

export default Header;