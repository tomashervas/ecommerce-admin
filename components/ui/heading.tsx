const Heading = ({title, description}: {title: string, description: string}) => {
  return (
    <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground tracking-wide">{description}</p>
    </div>
  )
}
export default Heading