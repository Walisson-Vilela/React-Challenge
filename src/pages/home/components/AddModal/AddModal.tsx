import React, { useState, useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
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
    formState: { isValid, isSubmitting, errors },
    reset,
    trigger,
  } = useForm<AddressData>({
    mode: "onChange",
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
  const [isNumberEditable, setIsNumberEditable] = useState(false);

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
    const cleanedCEP = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
    const maskedCEP = cleanedCEP.replace(/^(\d{5})(\d)/, "$1-$2"); // Aplica máscara XXXXX-XXX
    
    setValue("cep", maskedCEP); // Atualiza o valor com a máscara
  
    setValue("uf", "");
    setValue("city", "");
    setValue("neighborhood", "");
    setValue("address", "");
    setValue("number", "");
  
    setIsNeighborhoodEditable(false);
    setIsAddressEditable(false);
    setIsNumberEditable(false);
  
    if (cleanedCEP.length === 8) {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cleanedCEP}/json/`);
  
        if (data.erro) {
          alert("CEP não encontrado. Verifique o número digitado.");
          return;
        }
  
        setValue("uf", data.uf || "");
        setValue("city", data.localidade || "");
        setValue("neighborhood", data.bairro || "");
        setValue("address", data.logradouro || "");
  
        setIsNeighborhoodEditable(!data.bairro);
        setIsAddressEditable(!data.logradouro);
        setIsNumberEditable(true);
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Erro ao buscar o CEP. Verifique sua conexão com a internet.");
      } finally {
        setIsLoading(false);
      }
    }
    trigger("cep");
    trigger("number");
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
          rules={{ required: "CEP é obrigatório" }}
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
        {errors.cep && <span style={{ color: "red", fontSize: '0.6rem', marginTop: '-14px' }}>{errors.cep.message}</span>}

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
          rules={{ required: "Número é obrigatório" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="number"
              disabled={isLoading || !isNumberEditable}
              placeholder="Digite o número"
            />
          )}
        />
        {errors.number && (
          <span style={{ color: "red", fontSize: '0.6rem', marginTop: '-14px' }}>{errors.number.message}</span>
        )}

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
            <input {...field} type="text" id="city" readOnly placeholder="Cidade" />
          )}
        />

        {/* Estado */}
        <label htmlFor="uf">Estado</label>
        <Controller
          name="uf"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" id="uf" readOnly placeholder="UF" />
          )}
        />

        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
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
