import React, { useEffect, useState } from 'react';
import { UsersProvider } from 'providers';
import RoleTable from './RoleTable';

const RoleListing = props => {
    const { setActiveRole, setShowDetailModal } = props;
    const [ roles, setRoles ] = useState([]);
    const [ resultsLoading, setResultsLoading ] = useState(true);
    const fetchData = async () => {
        const { match } = props;
        const { params } = match;
        const { id } = params;
        if (id) {
            console.log(id)
            const role = await UsersProvider.role(id);
            if (role) {
                setActiveRole(role);
                setShowDetailModal(true);
            }
        }
        const roles = await UsersProvider.roles();
        if (roles.results) setRoles(roles.results);
        setResultsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="user-listing">
            <RoleTable
                roles={roles}
                resultsLoading={resultsLoading}
                {...props}
            />
        </div>
    );
};

export default RoleListing;
