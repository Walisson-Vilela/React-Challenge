import React, { useState } from 'react';
import { Box, Button, Modal, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: any;
}

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2
};

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        cep: '',
        uf: '',
        city: '',
        neighborhood: '',
        address: '',
        number: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleCEPChange = async (cep: string) => {
        setFormData({ cep, uf: '', city: '', neighborhood: '', address: '', number: '' });
        if (cep.length === 8) {
            setIsLoading(true);
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                setFormData({
                    cep,
                    uf: data.uf || '',
                    city: data.localidade || '',
                    neighborhood: data.bairro || '',
                    address: data.logradouro || '',
                    number: '',
                });
            } catch (error) {
                console.error("Error fetching CEP", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={modalStyle}>
                <h2>{initialData ? 'Edit Visit' : 'Create Visit'}</h2>
                <TextField
                    label="CEP"
                    name="cep"
                    value={formData.cep}
                    onChange={(e) => handleCEPChange(e.target.value)}
                    disabled={isLoading}
                />
                {isLoading && <CircularProgress size={24} style={{ alignSelf: 'center' }} />}
                <TextField label="UF" name="uf" value={formData.uf} InputProps={{ readOnly: true }} />
                <TextField label="City" name="city" value={formData.city} InputProps={{ readOnly: true }} />
                <TextField
                    label="Neighborhood"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <TextField
                    label="Number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    type="number"
                />
                <Box display="flex" justifyContent="space-between">
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSubmit} 
                        disabled={Object.values(formData).some(value => !value)}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateModal;