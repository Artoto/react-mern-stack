interface LoaddingProps {
  isLoading: boolean;
}

const Loadding: React.FC<LoaddingProps> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen fixed top-0 left-0 w-full z-50  bg-black/55">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
    </>
  );
};

export default Loadding;
