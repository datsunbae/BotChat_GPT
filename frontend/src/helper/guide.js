function guide_chat(){
    return (
        <div className="guide">
          <ChakraProvider>
            <Container maxW="75vw" centerContent>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route
                    path="//guides"
                    element={
                      <Authencation redirectTo="/">
                        <ChatPage />
                      </Authencation>
                    }
                  ></Route>
                </Routes>
              </BrowserRouter>
            </Container>
          </ChakraProvider>
        </div>
      );
}