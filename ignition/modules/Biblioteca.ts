import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BibliotecaModule = buildModule(
  "BibliotecaModule",
  (m) => {

    const biblioteca = m.contract(
      "Biblioteca"
    );

    return { biblioteca };
  }
);

export default BibliotecaModule;