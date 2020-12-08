export const ERROR_MESSAGES = {

    STATE_DATABASE_ERROR: 'Ocorreu um erro ao consultar todos os estados!',
    ACRONYM_DATABASE_ERROR: 'Ocorreu um erro ao consultar a sigla "{}"!',
    ACRONYM_CONFLICT_EXISTS: 'Já existe um estado cadastrado com esta sigla "{}"!',
    STATE_CONFLICT_EXISTS: 'Já existe um estado cadastrado com este nome "{}"!',
    STATE_SAVE_DATABASE_ERROR: 'Ocorreu um erro ao salvar o estado!',
    STATE_UPDATE_DATABASE_ERROR: 'Ocorreu um  erro ao atualizar o estado!',
    STATE_CREATE_ERROR: 'Ocorreu um erro ao criar estado "{}"!',
    STATE_UPDATE_ERROR: 'Ocorreu um erro ao atualizar estado "{}"!',
    STATE_FIND_ALL_ERROR_OCURRED: 'Ocorreu um erro ao buscar todos estados!',
    STATE_NOT_FOUND: 'Estado nao encontrado!',
    STATE_FIND_BY_ID_NOT_FOUND: 'Estado com id "{}" não encontrado!',
    STATE_FIND_BY_NAME_NOT_FOUND: 'O estado com nome "{}" não foi encontrado!',
    STATE_FIND_BY_ACRONYM_NOT_FOUND: 'O estado com a sigla "{}"não foi encontrado!',

    CITY_FIND_ALL_ERROR_OCURRED: 'Ocorreu um erro ao buscar todas cidades!',
    CITY_DATABASE_ERROR: 'Ocorreu um erro ao consultar todas as cidades!',
    CITY_UPDATE_DATABASE_ERROR: 'Ocorreu um  erro ao atualizar a cidade!',
    CITY_SAVE_DATABASE_ERROR: 'Ocorreu um erro ao salvar a cidade!',
    CITY_TO_STATE_CONFLICT_EXISTS: 'Já existe uma cidade cadastrada com este nome "{}" para este estado!',
    CITY_UPDATE_ERROR: 'Ocorreu um erro ao atualizar a cidade "{}"!',
    CITY_FIND_BY_ID_NOT_FOUND: 'Cidade com id "{}" não encontrado!',
    CITY_FIND_BY_NAME_NOT_FOUND: 'A cidade com nome "{}" não foi encontrada!',
};

export const SUCCESS_MESSAGES = {
    GET_SUCCESS: 'Resposta retornada com sucesso!',
    CREATE_STATE_SUCCESS: 'Estado cadastrado com sucesso!',
    UPDATE_STATE_SUCCESS: 'Estado atualizado com sucesso!',
};
