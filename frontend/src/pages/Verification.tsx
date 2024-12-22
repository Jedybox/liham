
interface VerificationProps {
  isVerified: boolean;
  token: string;
}

function Verification(props: VerificationProps): JSX.Element | null | undefined {

  if (!props.isVerified) 
    return;
  
  return (
    <div
      className="absolute"
      >
        Verification</div>
  )
}

export default Verification