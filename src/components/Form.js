const Form = (props) => {
    const { getUserInput } = props


    return (
        <>
        <h2>This is where the form could be</h2>
        <form onSubmit={getUserInput}>
            <label>
                Enter City:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </>
    )
}

export default Form