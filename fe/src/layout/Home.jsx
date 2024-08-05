import { Button } from "@material-ui/core";


export default function Home() {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Home</h1>
            <a href="/login"><Button variant="contained" color="primary">Join now</Button></a>

        </div>
    );
}
