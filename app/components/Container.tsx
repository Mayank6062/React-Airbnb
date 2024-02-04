'use client';

interface ContainerProps {
  children: React.ReactNode
};

//interface likhne se ab me direct container div jo nav me h use changes kar sakta hu
const Container: React.FC<ContainerProps> = ({ children }) => {
  return ( 
    <div
        className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">{children}</div>
    );
}
 
export default Container;

//////////////////////////////////////////