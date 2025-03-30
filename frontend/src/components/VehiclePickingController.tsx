import { SelectDetailsPage } from '@/components/pages/SelectDetailsPage';
import { SelectMakePage } from '@/components/pages/SelectMakePage';
import { SelectModelPage } from '@/components/pages/SelectModelPage';
import { SelectSubModelPage } from '@/components/pages/SelectSubModelPage';
import { SummaryPage } from '@/components/pages/SummaryPage';
import { useState, useEffect } from 'react';
import {
  fetchDetails,
  fetchMakes,
  fetchModels,
  fetchSubModels,
} from '../util.ts';

export type StepState =
  | 'initial'
  | 'make-selected'
  | 'model-selected'
  | 'submodel-selected'
  | 'details-selected';

export type VehicleDetails = {
  date: Date | null;
  transmission: string | null;
  fuel: string | null;
  engineSize: string | null;
};

export const VehiclePickingController = () => {
  const [selectedMake, setMake] = useState<string | null>(null);
  const [selectedModel, setModel] = useState<string | null>(null);
  const [selectedSubModel, setSubModel] = useState<string | null>(null);
  const [selectedDetails, setDetails] = useState<VehicleDetails>({
    date: null,
    transmission: null,
    fuel: null,
    engineSize: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [submodels, setSubModels] = useState<string[]>([]);
  const [availableDetails, setAvailableDetails] = useState<{
    transmissions: string[];
    fuels: string[];
    engineSizes: string[];
  }>({ transmissions: [], fuels: [], engineSizes: [] });

  const [currentStep, setCurrentStep] = useState<StepState>('initial');

  useEffect(() => {
    setIsLoading(true);
    fetchMakes()
      .then(setMakes)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedMake) {
      setIsLoading(true);
      fetchModels(selectedMake)
        .then(setModels)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [selectedMake]);

  useEffect(() => {
    if (selectedMake && selectedModel) {
      setIsLoading(true);
      fetchSubModels(selectedMake, selectedModel)
        .then((subModels) => {
          setSubModels(subModels ?? []);
          if (subModels.length === 0) handleNextButtonClick();
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [selectedModel]);

  useEffect(() => {
    if (selectedMake && selectedModel) {
      setIsLoading(true);
      fetchDetails(selectedMake, selectedModel, selectedSubModel)
        .then((availableDetails) => {
          setAvailableDetails({
            transmissions: availableDetails.availableTransmissions || [],
            fuels: availableDetails.availableFuels || [],
            engineSizes: availableDetails.engineSizeOptions || [],
          });
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [selectedSubModel, currentStep]);

  const handleNextButtonClick = () => {
    switch (currentStep) {
      case 'initial':
        if (selectedMake) setCurrentStep('make-selected');
        break;
      case 'make-selected':
        if (selectedModel)
          setCurrentStep(
            submodels.length > 0 ? 'model-selected' : 'submodel-selected'
          );
        break;
      case 'model-selected':
        setCurrentStep('submodel-selected');
        break;
      case 'submodel-selected':
        setCurrentStep('details-selected');
        break;
    }
  };

  const handleSkipButtonClick = () => {
    setSubModel(null);
    setCurrentStep('submodel-selected');
  };

  const handleBackButtonClick = () => {
    switch (currentStep) {
      case 'make-selected':
        setCurrentStep('initial');
        break;
      case 'model-selected':
        setCurrentStep('make-selected');
        break;
      case 'submodel-selected':
        setCurrentStep(
          submodels.length > 0 ? 'model-selected' : 'make-selected'
        );
        break;
      case 'details-selected':
        setCurrentStep(
          submodels.length > 0 ? 'submodel-selected' : 'model-selected'
        );
        break;
    }
  };

  const handleDetailSelect = (
    detail: keyof VehicleDetails,
    value: string | Date
  ) => {
    setDetails((prev) => ({
      ...prev,
      [detail]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className='mx-auto w-full max-w-2xl p-4 text-center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='mx-auto w-full max-w-2xl'>
      {(() => {
        switch (currentStep) {
          case 'initial':
            return (
              <SelectMakePage
                ListOfMakes={makes}
                selectedMake={selectedMake}
                onMakeSelect={setMake}
                onNext={handleNextButtonClick}
              />
            );
          case 'make-selected':
            return (
              <SelectModelPage
                modelsList={models}
                selectedModel={selectedModel}
                onModelSelect={setModel}
                onNext={handleNextButtonClick}
                onBack={handleBackButtonClick}
              />
            );
          case 'model-selected':
            return (
              <SelectSubModelPage
                subModelsList={submodels}
                selectedSubModel={selectedSubModel}
                onSubModelSelect={setSubModel}
                onNext={handleNextButtonClick}
                onBack={handleBackButtonClick}
                onSkip={handleSkipButtonClick}
              />
            );
          case 'submodel-selected':
            return (
              <SelectDetailsPage
                detailsList={availableDetails}
                selectedDetails={selectedDetails}
                onDetailSelect={handleDetailSelect}
                onNext={handleNextButtonClick}
                onBack={handleBackButtonClick}
              />
            );
          case 'details-selected':
            return (
              <SummaryPage
                modelDetails={selectedDetails}
                make={selectedMake}
                model={selectedModel}
                submodel={selectedSubModel}
                onEdit={(step: StepState) => {
                  setCurrentStep(step);
                  if (step === 'initial') {
                    setModel(null);
                    setSubModel(null);
                  }
                  if (step === 'make-selected') setSubModel(null);
                }}
                onBack={handleBackButtonClick}
              />
            );
        }
      })()}
    </div>
  );
};
