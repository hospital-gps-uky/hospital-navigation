import axios from "axios";

const baseURL = 'http://52.15.182.114:8000'

export default class api {

    static getLocationImageURL(id) {
        return `${baseURL}/location/image/get/${id}`;
    }

    static getMapImageURL(id) {
        return `${baseURL}/map/image/get/${id}`;
    }


    static async getMaps(startIndex, amount) {
        try {
            var res = await axios.get(`${baseURL}/map/get/${startIndex}/${amount}`);

            if (res.status === 200) {
                // Fetch worked
                return res.data;
            } else {
                // Fetch failed, do something about it
                return [];
            }
        } catch {
            // Fetch failed, do something about it
            return [];
        }
    }


    static async login(email, password) {
        try {
            var res = await axios.post(`${baseURL}/users/login`, {
                "password": password,
                "email": email,
            })

            if (res.status === 200) {
                // Login worked
                return res.data.data.token;
            } else {
                // Login failed, do something about it
                return "";
            }
        } catch {
            // Login failed, do something about it
            return "";
        }
    }

    static async getLocations(startIndex, amount, authToken) {
        try {
            var res = await axios.get(`${baseURL}/location/get/${startIndex}/${amount}`, {
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Fetch worked
                return res.data;
            } else {
                // Fetch failed, do something about it
                return [];
            }
        } catch {
            // Fetch failed, do something about it
            return [];
        }
    }

    static async addLocation(location, authToken) {
        try {
            var res = await axios.post(`${baseURL}/location/add`, location, {
                
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Add worked
                return res.data;
            } else {
                // Add failed, do something about it
                return null;
            }
        } catch {
            // Add failed, do something about it
            return null;
        }
    }

    static async getLocationsByType(type) {
        try {
            var res = await axios.get(`${baseURL}/location/type/get/${type}`);

            if (res.status === 200) {
                // Fetch worked
                return res.data;
            } else {
                // Fetch failed, do something about it
                return [];
            }
        } catch {
            return [];
        }
    }

    static async updateLocation(location, authToken) {
        try {
            var res = await axios.patch(`${baseURL}/location/patch/${location.id}`, location, {
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Update worked
                return res.data;
            } else {
                // Update failed, do something about it
                return null;
            }
        } catch {
            // Update failed, do something about it
            return null;
        }
    }

    static async deleteLocation(id, authToken) {
        try {
            var res = await axios.delete(`${baseURL}/location/delete/${id}`, {
                
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            return res.status === 200;
        } catch {
            // Add failed, do something about it
            return false;
        }
    }

    static async getEdges(startIndex, amount, authToken) {
        try {
            var res = await axios.get(`${baseURL}/edge/get/${startIndex}/${amount}`, {
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Fetch worked
                return res.data;
            } else {
                // Fetch failed, do something about it
                return [];
            }
        } catch {
            // Fetch failed, do something about it
            return [];
        }
    }

    static async addEdge(edge, authToken) {
        try {
            var res = await axios.post(`${baseURL}/edge/add`, edge, {
                
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Add worked
                return res.data;
            } else {
                // Add failed, do something about it
                return null;
            }
        } catch {
            // Add failed, do something about it
            return null;
        }
    }

    static async updateEdge(edge, authToken) {
        try {
            var res = await axios.patch(`${baseURL}/edge/patch/${edge.id}`, edge, {
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Update worked
                return res.data;
            } else {
                // Update failed, do something about it
                return null;
            }
        } catch {
            // Update failed, do something about it
            return null;
        }
    }

    static async deleteEdge(id, authToken) {
        try {
            var res = await axios.delete(`${baseURL}/edge/delete/${id}`, {
                
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            return res.status === 200;
        } catch {
            // Add failed, do something about it
            return false;
        }
    }

    static async getPhysician(startIndex, amount, authToken) {
        try {
            var res = await axios.get(`${baseURL}/physician/get/${startIndex}/${amount}`, {
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Fetch worked
                return res.data;
            } else {
                // Fetch failed, do something about it
                return [];
            }
        } catch {
            // Fetch failed, do something about it
            return [];
        }
    }

    static async getPath(start_id, end_id) {
        try {
            var res = await axios.post(`${baseURL}/find_path`, {
                location1_id: Number(start_id),
                location2_id: Number(end_id)
            });

            if (res.status === 200) {
                // Fetch worked
                return res.data;
            } else {
                // Fetch failed, do something about it
                return [];
            }
        } catch {
            // Fetch failed, do something about it
            return [];
        }
    }

    static async addPhysician(physician, authToken) {
        try {
            var res = await axios.post(`${baseURL}/physician/add`, {...physician}, {
                
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Add worked
                return res.data;
            } else {
                // Add failed, do something about it
                return null;
            }
        } catch {
            // Add failed, do something about it
            return null;
        }
    }

    static async updatePhysician(physician, authToken) {
        try {
            var res = await axios.patch(`${baseURL}/physician/patch/${physician.id}`, physician, {
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            if (res.status === 200) {
                // Update worked
                return res.data;
            } else {
                // Update failed, do something about it
                return null;
            }
        } catch {
            // Update failed, do something about it
            return null;
        }
    }

    static async deletePhysician(id, authToken) {
        try {
            var res = await axios.delete(`${baseURL}/physician/delete/${id}`, {
                
                headers: {
                    'Authorization': `Authorization ${authToken}`
                }
            });

            return res.status === 200;
        } catch {
            // Add failed, do something about it
            return false;
        }
    }


    static async runQRScript()  {
        try {
            //request
            const res = await axios.post(`${baseURL}/run-qrpython-script`);
            
            if (res.status === 200) {
                //successful run
                return res.data; 
            } else {
                //unsuccessful run
                return "";
            }
        } catch (error) {
            //error message
            console.error(error);
            return "";
        }
    }


}