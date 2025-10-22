import React, { useEffect, useRef, useState } from 'react';
import { FaUserCircle, FaTools, FaShieldAlt, FaCamera } from 'react-icons/fa';

import { ProfessionalInfoPlaceholder } from './ProfessionalInfoPlaceholder';
import { SecurityPlaceholder } from './SecurityPlaceholder';
import { ServicesPlaceholder } from './ServicesPlaceholder';
import { useNavigate } from 'react-router-dom';

const MenuSection = ({ icon: Icon, title, children }) => (
  <div className='mb-8 last:mb-0'>
    <div className='mb-4 flex items-center gap-3 text-base font-semibold md:text-lg'>
      <span className='flex h-10 w-10 items-center justify-center rounded-full bg-[#F69027] text-white'>
        <Icon className='text-lg md:text-xl' />
      </span>
      <span>{title}</span>
    </div>
    <div className='flex flex-col gap-3 pl-2 md:pl-5'>{children}</div>
  </div>
);

const MenuButton = ({ active, children, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`w-full rounded-lg border border-transparent px-4 py-2 text-left text-sm font-medium transition hover:border-[#F69027] hover:text-[#F69027] focus:outline-none ${
      active ? 'bg-[#F69027] text-white' : 'bg-[#f5f8fb] text-[#002C57]'
    }`}
  >
    {children}
  </button>
);

const initialPersonalFields = {
  username: 'RebornBRPX',
  fullName: 'Rodrigo dos Santos',
  email: 'r********reborn@gmail',
  phone: '(81) 9 ****-6031',
};

const EditInfo = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [fields, setFields] = useState(initialPersonalFields);
  const [gender, setGender] = useState('Masculino');
  const [selectedImageName, setSelectedImageName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleFieldChange = (id, newValue) => {
    setFields(prev => ({ ...prev, [id]: newValue }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Dados salvos:', {
      gender,
      personal: fields,
      avatar: selectedImageName,
    });
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = event => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedImageName(file.name);
    setImagePreview(prev => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }
      return URL.createObjectURL(file);
    });
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const renderPersonalSection = () => (
    <div className='mt-8 flex flex-col gap-8 xl:flex-row'>
      <form className='flex-1' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
          <div className='flex flex-col gap-2 text-sm font-semibold'>
            <span>Nome de usuario</span>
            <input
              type='text'
              value={fields.username}
              onChange={event =>
                handleFieldChange('username', event.target.value)
              }
              className='w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none'
            />
          </div>

          <div className='flex flex-col gap-2 text-sm font-semibold'>
            <span>Nome</span>
            <input
              type='text'
              value={fields.fullName}
              onChange={event =>
                handleFieldChange('fullName', event.target.value)
              }
              className='w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none'
            />
          </div>

          <div className='flex flex-col gap-2 text-sm font-semibold'>
            <span>Email</span>
            <div className='relative'>
              <input
                type='email'
                value={fields.email}
                onChange={event =>
                  handleFieldChange('email', event.target.value)
                }
                className='w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none'
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#F69027]'
              >
                Trocar
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-2 text-sm font-semibold'>
            <span>Celular</span>
            <div className='relative'>
              <input
                type='tel'
                value={fields.phone}
                onChange={event =>
                  handleFieldChange('phone', event.target.value)
                }
                className='w-full rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none'
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#F69027]'
              >
                Trocar
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-2 text-sm font-semibold md:col-span-1'>
            <span>Sexo</span>
            <select
              value={gender}
              onChange={event => setGender(event.target.value)}
              className='w-full appearance-none rounded-lg border-2 border-[#F69027] bg-white px-4 py-3 text-base font-normal text-[#002C57] shadow-sm focus:border-[#002C57] focus:outline-none'
            >
              <option value='Masculino'>Masculino</option>
              <option value='Feminino'>Feminino</option>
              <option value='Outro'>Outro</option>
              <option value='Prefiro nao dizer'>Prefiro nao dizer</option>
            </select>
          </div>

          <div className='md:col-span-2'>
            <div className='rounded-xl border border-[#d1e1f0] bg-[#f5f9ff] px-6 py-4 text-center'>
              <p className='text-sm font-semibold tracking-wide'>
                Nome/CPF/Data nascimento
              </p>
              <p className='mt-2 font-mono text-lg tracking-widest'>
                *********** / ***.***.***-** / **-10-90
              </p>
              <div className='mt-4 inline-flex items-center gap-3 rounded-full border border-[#16a34a] bg-white px-5 py-2 text-sm font-semibold text-[#16a34a]'>
                <span className='h-3 w-3 rounded-full bg-[#16a34a]' />
                Verificado
              </div>
            </div>
          </div>

          <div className='md:col-span-2 flex justify-center'>
            <button
              type='submit'
              className='rounded-full bg-[#F69027] px-10 py-3 text-lg font-semibold text-white shadow-md transition hover:brightness-110'
            >
              Salvar
            </button>
          </div>
        </div>
      </form>

      <div className='flex w-full max-w-xs flex-col items-center gap-4 self-start xl:w-64'>
        <div className='flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-4 border-[#F69027] bg-[#fef8f1] text-[#F69027] sm:h-44 sm:w-44'>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt='Preview do avatar'
              className='h-full w-full object-cover'
            />
          ) : (
            <FaUserCircle className='text-5xl sm:text-6xl' />
          )}
        </div>
        <p className='text-center text-xs font-medium text-[#002C57] sm:text-sm'>
          Tamanho maximo: 1.5Mb
          <br />
          Tipos aceitos: JPG, PNG
        </p>
        {selectedImageName && (
          <p className='text-center text-xs font-medium text-[#F69027]'>
            {selectedImageName}
          </p>
        )}
        <input
          ref={fileInputRef}
          type='file'
          accept='image/png,image/jpeg'
          className='hidden'
          onChange={handleImageChange}
        />
        <button
          type='button'
          onClick={openFilePicker}
          className='flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#F69027] bg-white px-6 py-3 text-sm font-semibold text-[#F69027] shadow-sm transition hover:bg-[#F69027] hover:text-white'
        >
          <FaCamera />
          Selecionar imagem
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalSection();
      case 'professional':
        return <ProfessionalInfoPlaceholder />;
      case 'services':
        return <ServicesPlaceholder />;
      case 'password':
        return <SecurityPlaceholder title='Alterar senha' />;
      case 'linkedAccounts':
        return <SecurityPlaceholder title='Contas vinculadas' />;
      default:
        return null;
    }
  };

  return (
    <section className='min-h-screen bg-[#f3f7fb] px-4 py-10 text-[#002C57] md:py-12'>
      <div className='mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[260px_1fr]'>
        <aside className='rounded-3xl border border-[#ccd9e6] bg-white p-6 shadow-sm lg:h-fit'>
          <MenuSection icon={FaUserCircle} title='Meu Perfil'>
            <MenuButton
              active={activeSection === 'personal'}
              onClick={() => setActiveSection('personal')}
            >
              Informacoes pessoais
            </MenuButton>
            <MenuButton
              active={activeSection === 'professional'}
              onClick={() => setActiveSection('professional')}
            >
              Informacoes profissionais
            </MenuButton>
          </MenuSection>

          <MenuSection icon={FaTools} title='Servicos'>
            <MenuButton
              active={activeSection === 'services'}
              onClick={() => setActiveSection('services')}
            >
              Ver servicos
            </MenuButton>
          </MenuSection>

          <MenuSection icon={FaShieldAlt} title='Seguranca'>
            <MenuButton
              active={activeSection === 'password'}
              onClick={() => setActiveSection('password')}
            >
              Alterar senha
            </MenuButton>
            <MenuButton
              active={activeSection === 'linkedAccounts'}
              onClick={() => setActiveSection('linkedAccounts')}
            >
              Contas vinculadas
            </MenuButton>
            <MenuButton onClick={() => navigate('/')}>Voltar</MenuButton>
          </MenuSection>

        </aside>

        <div className='rounded-3xl border border-[#ccd9e6] bg-white p-6 shadow-sm md:p-10'>
          <h1 className='text-center text-xl font-semibold md:text-3xl'>
            Gerencie suas informacoes
          </h1>
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export { EditInfo };
