import React, { useState, useEffect } from "react";
import { Box, Button, Modal, CircularProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
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
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
    reset,
  } = useForm<AddressData>({
    mode: "onBlur",
    defaultValues: {
      cep: "",
      uf: "",
      city: "",
      neighborhood: "",
      address: "",
      number: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNeighborhoodEditable, setIsNeighborhoodEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          cep: "",
          uf: "",
          city: "",
          neighborhood: "",
          address: "",
          number: "",
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const handleCEPChange = async (cep: string) => {
    setValue("cep", cep);
    setIsNeighborhoodEditable(false);
    setIsAddressEditable(false);

    if (cep.length === 8) {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setValue("uf", data.uf || "");
        setValue("city", data.localidade || "");
        setValue("neighborhood", data.bairro || "");
        setValue("address", data.logradouro || "");
        setIsNeighborhoodEditable(!data.bairro);
        setIsAddressEditable(!data.logradouro);
      } catch (error) {
        console.error("Error fetching CEP", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onSubmit = (data: AddressData) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>{initialData ? "Editar visita" : "Criar nova visita"}</h2>
        {/* CEP */}
        <label htmlFor="cep">CEP</label>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="cep"
              disabled={isLoading}
              placeholder="Digite o CEP"
              onChange={(e) => handleCEPChange(e.target.value)}
            />
          )}
        />
        {isLoading && <CircularProgress size={24} style={{ alignSelf: "center" }} />}

        {/* Logradouro */}
        <label htmlFor="address">Logradouro</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="address"
              disabled={isLoading || !isAddressEditable}
              placeholder="Digite o logradouro"
            />
          )}
        />

        {/* Número */}
        <label htmlFor="number">Número</label>
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <input {...field} type="number" id="number" placeholder="Digite o número" />
          )}
        />

        {/* Bairro */}
        <label htmlFor="neighborhood">Bairro</label>
        <Controller
          name="neighborhood"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="neighborhood"
              disabled={isLoading || !isNeighborhoodEditable}
              placeholder="Digite o bairro"
            />
          )}
        />

        {/* Cidade */}
        <label htmlFor="city">Cidade</label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" id="city" readOnly disabled={isLoading || !isAddressEditable} placeholder="Digite a cidade" />
          )}
        />

        {/* Estado */}
        <label htmlFor="uf">Estado</label>
        <Controller
          name="uf"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" id="uf" readOnly disabled={isLoading || !isAddressEditable} placeholder="Digite o estado" />
          )}
        />

        <Box display="flex" justifyContent="space-between">
          {/* Botão Cancelar */}
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>

          {/* Botão Salvar */}
          <PrimaryButton
            text="Salvar"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading || !isValid || isSubmitting}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default AddModal;
