import React, { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";

interface AddressData {
  cep: string;
  uf: string;
  city: string;
  neighborhood: string;
  address: string;
  number: string;
}

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddressData) => void;
  initialData?: AddressData;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const AddModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const defaultFormData: AddressData = {
    cep: "",
    uf: "",
    city: "",
    neighborhood: "",
    address: "",
    number: "",
  };

  const [formData, setFormData] = useState<AddressData>(defaultFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isNeighborhoodEditable, setIsNeighborhoodEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setIsEditing(true);
        setFormData(initialData);
      } else {
        setIsEditing(false);
        setFormData(defaultFormData);
      }
    }
  }, [isOpen, initialData]);

  const handleCEPChange = async (cep: string) => {
    setFormData({
      ...defaultFormData,
      cep,
    });
    setIsNeighborhoodEditable(false);
    setIsAddressEditable(false);

    if (cep.length === 8) {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setFormData((prev) => ({
          ...prev,
          cep,
          uf: data.uf || "",
          city: data.localidade || "",
          neighborhood: data.bairro || "",
          address: data.logradouro || "",
        }));
        setIsNeighborhoodEditable(!data.bairro);
        setIsAddressEditable(!data.logradouro);
      } catch (error) {
        console.error("Error fetching CEP", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.cep &&
    formData.uf &&
    formData.city &&
    formData.neighborhood &&
    formData.address &&
    formData.number;

  const handleSubmit = () => {
    if (isFormValid) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>{isEditing ? "Editar visita" : "Criar nova visita"}</h2>
        {/* CEP */}
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={formData.cep}
          onChange={(e) => handleCEPChange(e.target.value)}
          disabled={isLoading}
          placeholder="Digite o CEP"
        />
        {isLoading && (
          <CircularProgress size={24} style={{ alignSelf: "center" }} />
        )}

        {/* Logradouro */}
        <label htmlFor="address">Logradouro</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={isLoading || !isAddressEditable}
          placeholder="Digite o logradouro"
        />

        {/* Número */}
        <label htmlFor="number">Número</label>
        <input
          type="number"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Digite o número"
        />

        {/* Bairro */}
        <label htmlFor="neighborhood">Bairro</label>
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          disabled={isLoading || !isNeighborhoodEditable}
          placeholder="Digite o bairro"
        />

        {/* Cidade */}
        <label htmlFor="city">Cidade</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          readOnly
          disabled={isLoading || !isAddressEditable}
          placeholder="Digite a cidade"
        />

        {/* Estado */}
        <label htmlFor="uf">Estado</label>
        <input
          type="text"
          id="uf"
          name="uf"
          value={formData.uf}
          readOnly
          disabled={isLoading || !isAddressEditable}
          placeholder="Digite o estado"
        />

        <Box display="flex" justifyContent="space-between">
          {/* Botão Cancelar */}
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>

          {/* Botão Salvar */}
          <PrimaryButton
            text="Salvar"
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AddModal;
