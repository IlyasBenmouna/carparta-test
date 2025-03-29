import { VehiclePickingController } from '@/components/VehiclePickingController.tsx';

function App() {
  return (
    <main className='flex h-screen flex-col items-center justify-center bg-slate-100'>
      <div className='flex h-[90%] w-[90%] items-center rounded-3xl bg-black shadow-lg drop-shadow-2xl'>
        <VehiclePickingController />
      </div>
    </main>
  );
}

export default App;
